/**
 * Access modifiers
 *  - readonly   => cannot modify or update
 *  - public     => can access anywhere
 *  - private    => only accessible within class
 *  - protected  => accessible within own class, also inherited class
 */

class BankAccount {
  public readonly id: string;
  protected _name: string;
  private _balance: number;

  constructor(id: string, name: string, balance: number) {
    this.id = id;
    this._name = name;
    this._balance = balance;
  }

  deposit(amount: number) {
    this._balance += amount;
  }

  getAccountInfo() {
    return { id: this.id, name: this._name, ballance: this._balance };
  }
}

const bankAccountOne = new BankAccount('1', 'Mr. Z', 100);
