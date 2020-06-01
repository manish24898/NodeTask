`use strict`;

const {generateCredentials, customRequiredMsg, customAlreadyExistErr, generateJwt, errorResponseManagement} = require("../utils/utils");
const {APIS, SERVER, ERROR_MESSAGES, STATUS_CODE} = require("../utils/constants");
const {createWallet, signTransaction, walletInfo,generateRandom} = require("../services/taskService");

module.exports = (app) => {

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Sign up user //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.post(APIS.CREATE_WALLET, async (req, res) => {
        try {
            let body = req.body;
            let params =  req.params;

            let error = await customRequiredMsg(body, ['walletID']);
            if (error) {
                res.status(error[0]);
                return res.send(error[1]);
            }

            let returnData = await createWallet(body,params);

            res.status(returnData[0]);
            return res.send(returnData[1]);

        } catch (error) {

            error = errorResponseManagement(error);
            res.status(error[0]);
            return res.send(error[1]);
        }
    });

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Sign in user //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.post(APIS.SIGN_TRANSACTION, async (req, res) => {
        try {
            let body = req.body;
            let params = req.params;

            let keysToCheck = ['fromWalletID', 'recipientID','description','amount','feeTypeId','consumerId','subtractFee','smartContractOperation','ledgerSpecificFields'];
            let error = await customRequiredMsg(body,keysToCheck );
            if (error) {
                res.status(error[0]);
                return res.send(error[1]);
            }

            let returnData = await signTransaction(body,params);

            res.status(returnData[0]);
            return res.send(returnData[1]);
        } catch (error) {
            error = errorResponseManagement(error);
            res.status(error[0]);
            return res.send(error[1]);
        }
    });


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Generate keygen //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.get(APIS.WALLET_INFO, async (req, res) => {
        try {
            let params = req.params;

            let returnData = await walletInfo(params);

            res.status(returnData[0]);
            return res.send(returnData[1]);

        } catch (error) {
            error = errorResponseManagement(error);
            res.status(error[0]);
            return res.send(error[1]);
        }
    });

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Generate random number //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.get(APIS.GENERATE_RANDOME, async (req, res) => {
        try {
            let query = req.query;

            let error = await customRequiredMsg(query,['number','creationUnixTimestamp'] );
            if (error) {
                res.status(error[0]);
                return res.send(error[1]);
            }

            let returnData =  await generateRandom(query);

            res.status(returnData[0]);
            return res.send(returnData[1]);

        } catch (error) {
            error = errorResponseManagement(error);
            res.status(error[0]);
            return res.send(error[1]);
        }
    });


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// test api //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
    app.get(APIS.DEFAULT, async (req, res) => {
        res.status(STATUS_CODE.SUCCESS);
        return res.send({message : "Its Working! Yeah"});
    });
};
