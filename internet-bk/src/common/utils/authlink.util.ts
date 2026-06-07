import crypto from "crypto";

export const CompareResetToken = (
    plainToken: string,
    hashedToken: string,
): boolean => {

    const tokenHash = crypto
        .createHash("sha256")
        .update(plainToken)
        .digest("hex");

    return tokenHash === hashedToken;
};

export const GeneratePasswordRestLink = () => {
    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    const passresetlink =
        `${process.env.FRONTEND_URL}/verify-password-reset?token=${rawToken}`;

    return {
        passresetlink,
        tokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10),
    };
};