type loginSchema = {
    type: string;
    data: {
        userId: string;
        password: string;
    };
};
export default loginSchema;