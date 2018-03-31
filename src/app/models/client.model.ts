export class Client {
    constructor(
        public businessName: string,
        public password: string,
        public ownerName: string[],
        public email: string,
        public rif: string,
        public address: string,
        public tlpNumber: string
    ) { }
}