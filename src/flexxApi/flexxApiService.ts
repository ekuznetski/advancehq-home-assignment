import {Transaction} from '@/domain/Transaction';
import {MoveMoneyPayload} from '@/domain/MoveMoney';
import {Account, CreateAccountPayload} from '@/domain/Account';
import {get, post, put, remove} from '@/flexxApi/FlexxApiClientService';

class FlexxApiService {
  private formatQueryParams(
    params?: Record<
      string,
      string | number | boolean | undefined | string[] | number[] | Date
    >,
  ): string {
    if (!params) return '';
    const queryParams = new URLSearchParams();
    for (const key in params) {
      const value = params[key];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => queryParams.append(key, String(item)));
        } else {
          queryParams.append(key, String(value));
        }
      }
    }
    return queryParams.toString();
  }

  async fetchAccounts(params: {search_term?: string}): Promise<Account[]> {
    const queryParams = this.formatQueryParams(params);
    return get<Account[]>({endpoint: `account?${queryParams}`});
  }

  async createAccount(payload: CreateAccountPayload): Promise<Account> {
    return post<Account>({endpoint: 'account', body: payload});
  }

  async moveMoney(payload: MoveMoneyPayload): Promise<unknown> {
    return post<unknown>({endpoint: 'move-money', body: payload});
  }

  async fetchAccountTransactions(accountId: string): Promise<Transaction[]> {
    return get<Transaction[]>({
      endpoint: `account/${accountId}/transactions`,
    });
  }

  async fetchTransactions(): Promise<Transaction[]> {
    return get<Transaction[]>({endpoint: 'transaction'});
  }
}

let instance: FlexxApiService | null = null;

const flexxApiService = (): FlexxApiService => {
  if (!instance) {
    instance = new FlexxApiService();
  }

  return instance;
};

export default flexxApiService;

export {get, put, post, remove, FlexxApiService};
