'use strict'

const communication = require('../../../utils/communication')
const logger = require('@open-age/logger')('processors:user:crete')
const webConfig = require('config').get('webServer')

const process = async (data, context) => {
    const log = logger.start('process')

    let user = await db.users.findById(data.id)
    console.log("user",user);
    user = JSON.parse(JSON.stringify(user));
    let email = user.email;
    user.email = "info@shelarecruitment.co.uk,ankit.pahwa@aol.com"; //info@shelarecruitment.co.uk
    console.log("user",user);
    const content = {
        template: 'user-register-employer',
        data: {
            name: user.fullName,
            emailUser: email,
            link: `${webConfig.url}/api/users/email/verify?token=${user.emailVerifyToken}`
        }
    }
    console.log("content",content);
    context.logger = log
    communication.forward(user, content, ['email'], false, context)

    log.end()
    return Promise.resolve()
}

exports.process = process