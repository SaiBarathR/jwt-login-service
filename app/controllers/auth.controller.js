exports.signIn = (req, res) => {
    const user = req.body;
    try {
        if(!user.account || !user.account.trim()) {
            res.status(400).send({ status: 'error', message: "Account is required." });
            return;
        }

        if(!user.password || !user.password.trim()) {
            res.status(400).send({ status: 'error', message: "Password is required." });
            return;
        }

        if (user.account && user.account.toLowerCase() === ('kissht') && user.password === 'Kissht@123') {
            res.status(200).send({
                account: user.account,
                accessToken: "nothing to see here",
                message: "User signed in successfully!",
                status: 'success'
            });
        }
        else {
            if (user.account.toLowerCase() != 'kissht') {
                res.status(400).send({ status: 'error', message: "Account does not exist." });
            } else if (user.password != 'Kissht@123') {
                res.status(400).send({ status: 'error', message: "Password is incorrect." });
            }else{
                res.status(500).send({ status: 'error', message: 'Sign in failed.' });
            }
        }
    } catch (err) {
        console.error("Error signing in:", err);
        res.status(500).send({ status: 'error', message: 'Sign in failed.' });
    }
};
