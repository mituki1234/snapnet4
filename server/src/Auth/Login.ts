import loginSchema from '../Schema/LoginSchema';

async function loginCheck(received: loginSchema, res: any, userCollection: any) {
    const user = await userCollection.findOne({
        user_id: received.data.userId,
        password: received.data.password,
    });
    if (user) {
        console.log("hello");
    } else {
        console.log("no");
    }
}

export default loginCheck;
