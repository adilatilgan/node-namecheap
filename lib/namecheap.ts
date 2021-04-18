import { NameCheapResponse } from './types';

const axios = require('axios').default;
const parser = require('xml2json');

export default class NameCheap {
  private ApiUser: string;

  private ApiKey: string;

  private ClientIp: string;

  private endpoint: string;

  constructor(apiUser, apiKey, clientIp, sandbox = true) {
    this.ApiUser = apiUser;
    this.ApiKey = apiKey;
    this.ClientIp = clientIp;
    this.endpoint = `https://api.${
      sandbox ? 'sandbox' : ''
    }.namecheap.com/xml.response`;
  }

  get domains() {
    const that = this;
    return {
      check: async (domains): Promise<NameCheapResponse> => {
        const response = await that
          .command(
            'domains.check',
            Array.isArray(domains) ? domains : [domains],
            'GET',
          )
          .then((resp) => resp)
          .catch((err) => {
            console.log(err);
            return err;
          });
        return response;
      },
    };
  }

  command = async (
    command,
    data,
    method: 'GET',
  ): Promise<NameCheapResponse> => {
    const params = {
      ApiUser: this.ApiUser,
      UserName: this.ApiUser,
      ApiKey: this.ApiKey,
      ClientIp: this.ClientIp,
      Command: `namecheap.${command}`,
      DomainList: data.join(','),
    };
    const response = await axios({
      method,
      url: this.endpoint,
      params,
    });
    return this.parse(response.data);
  };

  private parse = (response): any => {
    return parser.toJson(response, { object: true, coerce: true });
  };
}
