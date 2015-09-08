import superagent from 'superagent';
import V3 from './v3';
import V2 from './v2';

export default class MailChimpConnector extends V3 {
  constructor (datacenter, key) {
    super(datacenter, key);
    this.v2 = new V2(datacenter, key);
  }
}
