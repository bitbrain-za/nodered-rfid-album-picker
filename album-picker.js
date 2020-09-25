
module.exports = function(RED) 
{
  const isUtf8 = require('is-utf8');
  const fs = require('fs');
  function AlbumPickerNode(config) 
  {
      RED.nodes.createNode(this,config);
      var node = this;


      this.filename = config.path;      
      let rawdata = fs.readFileSync(this.filename);
      let tags = JSON.parse(rawdata).Tags;

      this.broker = config.broker;
      this.qos = parseInt(config.qos, 10);
      if (isNaN(this.qos) || this.qos < 0 || this.qos > 2) 
      {
        this.qos = 2;
      }

      this.brokerConn = RED.nodes.getNode(this.broker);

      this.topic = config.topic;

      if(this.brokerConn)
      {
        this.status({fill: 'red', shape: 'ring', text: 'node-red:common.status.disconnected'});
        if(this.topic)
        {
          node.brokerConn.register(this);

          this.brokerConn.subscribe(this.topic, this.qos, (topic, payload, packet) => 
          {
            if (isUtf8(payload)) 
            {
              payload = payload.toString();
              console.log("Tag rxed");
              console.log("Searching " + tags.length + " tags");
              try 
              {
                for(var i=0; i<tags.length; i++)
                {
                    // node.warn(tags[i].tag);
                    // node.warn(tags[i].uri);
                    if (tags[i].tag==payload)
                    {
                        let msg = {topic, payload, qos: packet.qos, retain: packet.retain};

                        msg.payload = 
                        {
                            data:
                            {
                                "media_content_type":tags[i].type,
                                "media_content_id":tags[i].uri
                            }
                        };
                        node.warn("Match");
                        msg.uri_attached = true
                        node.send(msg);
                        return msg;
                    }
                }
              } catch (err) {throw err;}
            }
          }, this.id);
          if (this.brokerConn.connected) 
          {
              node.status({fill: 'green', shape: 'dot', text: 'node-red:common.status.connected'});
          }

        }
        else 
        {
          this.error(RED._('mqtt.errors.not-defined'));
        }
      }
      else 
      {
        this.error(RED._('mqtt.errors.missing-config'));
      }
    }
    RED.nodes.registerType("album-picker",AlbumPickerNode);;
}