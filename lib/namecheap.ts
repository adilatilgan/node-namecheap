import {
  NameCheapResponse,
  ProductTypes,
  ProductCategories,
  ActionNames,
} from './types';

const axios = require('axios').default;
const parser = require('xml2json');
// const querystring = require('querystring');

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
    }namecheap.com/xml.response`;
  }

  get domains() {
    const that = this;
    return {
      check: async (domains): Promise<NameCheapResponse> => {
        const DomainList = (Array.isArray(domains) ? domains : [domains]).join(
          ',',
        );
        const response = await that.command(
          'domains.check',
          { DomainList },
          'GET',
        );
        return response;
      },
    };
  }

  get users() {
    const that = this;
    return {
      getPricing: async (
        ProductType: ProductTypes = ProductTypes.DOMAIN,
        ProductCategory: ProductCategories = ProductCategories.DOMAINS,
        PromotionCode = null,
        ActionName: ActionNames = ActionNames.REGISTER,
        ProductName = null,
      ): Promise<NameCheapResponse> => {
        const response = await that
          .command(
            'users.getPricing',
            {
              ProductType,
              ProductCategory,
              PromotionCode,
              ActionName,
              ProductName,
            },
            'GET',
          )
          .then((resp) => resp)
          .catch((err) => {
            return err;
          });
        return response;
      },
    };
  }

  command = async (
    command,
    parameters,
    method: 'GET',
  ): Promise<NameCheapResponse> => {
    axios.interceptors.request.use((x) => {
      return x;
    });

    const nameCheapParams = {
      ApiUser: this.ApiUser,
      UserName: this.ApiUser,
      ApiKey: this.ApiKey,
      ClientIp: this.ClientIp,
      Command: `namecheap.${command}`,
    };
    Object.assign(nameCheapParams, parameters);
    const response = await axios({
      method,
      url: this.endpoint,
      params: nameCheapParams,
    });
    return this.parse(response.data);
  };

  // eslint-disable-next-line
  private parse = (response): any => {
    return parser.toJson(response, { object: true, coerce: true });
  };
}
