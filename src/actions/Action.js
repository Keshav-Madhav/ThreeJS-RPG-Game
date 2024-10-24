export class Action {
  name = 'BaseAction';
  source = null;

  constructor(source) {
    this.source = source;


  }

  async perform() {
    console.log('Base Action');
  }

  async canPerform() {
    return true;
  }
}