`use strict`;

const SERVER = {
    NAME: "Task",
    SALT: 10,
};

const APIS = {
    CREATE_WALLET: "/kms/:ledgerID/createWallet",
    SIGN_TRANSACTION: "/kms/:ledgerID/signTransaction",
    WALLET_INFO : "/kms/:ledgerID/:walletID/getWalletInfo",
    GENERATE_RANDOME: "/kms/getRandomNumber",

    DEFAULT: "/kms/status",
};

const ERROR_MESSAGES = {
    USER_NOT_FOUND: "User not found!",
    USER_ALREADY_EXISTS: "User already exists!",
    INVALID_PASSWORD: "Invalid password!",
    UNAUTHORIZED_ACCESS: "Unauthorized access!",
};

const MESSAGE = {
  SUCCESS: "Successfully"
};

const STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    WENT_WRONG: 500,
    SERVER_CRASHED: 503,
    UNAUTHORIZED_ACCESS: 401
};


module.exports = {
    SERVER,
    APIS,
    ERROR_MESSAGES,
    STATUS_CODE,
    MESSAGE,
};
