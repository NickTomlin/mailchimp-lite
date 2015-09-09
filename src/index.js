import V3 from './v3';
import V2 from './v2';

export default class MailChimpConnector extends V3 {
  constructor ({datacenter, key}) {
    super({datacenter, key, version: '3.0'});
    this.v2 = new V2({datacenter, key, version: '2.0'});
  }
}
