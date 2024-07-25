exports.signIn = (req, res) => {
    const user = req.body;
    try {
        if (user.account && user.account.toLowerCase().includes('ozonetel')) {
            res.status(200).send({
                account: user.account,
                accessToken: "nothing to see here",
                message: "User signed in successfully!",
                status: 'success'
            });
        }
        else {
            res.status(401).send({ status: 'error', message: "Invalid account address." });
        }
    } catch (err) {
        console.error("Error signing in:", err);
        res.status(500).send({ status: 'error', message: 'Sign in failed.' });
    }

};
