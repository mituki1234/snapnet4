"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function loginCheck(received, res, userCollection) {
    const user = await userCollection.findOne({
        user_id: received.data.userId,
        password: received.data.password,
    });
    if (user) {
        console.log("hello");
    }
    else {
        console.log("no");
    }
}
exports.default = loginCheck;
