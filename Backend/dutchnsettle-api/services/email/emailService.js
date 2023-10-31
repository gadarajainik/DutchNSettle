const { PubSub } = require("@google-cloud/pubsub");
const appconfig = require("../../config/appconfig");

exports.sendEmail = async (data) => {
    try {
        const client = new PubSub();
        const dataBuffer = Buffer.from(JSON.stringify(data));

        const messageId = await client
            .topic(appconfig.pubsub.topicId)
            .publishMessage({ data: dataBuffer });
        return messageId;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}