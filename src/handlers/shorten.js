
function isValidCreateShortURLRequestBody(body) {
    const regex = /^[0-9a-zA-Z_]{4,}$/;
    const { url, shortcode } = body;

    if (!url || !url.trim()) {
        return { message: 'url is not present', status: 400 };
    }

    if (!shortcode || !shortcode.trim()) {
        return { message: 'shortcode is not present', status: 400 };
    }

    if (!regex.test(shortcode)) {
        return { message: 'The shortcode fails to meet the following regexp: ^[0-9a-zA-Z_]{4,}$.', status: 422 };
    }
    return null;
}


async function createShortUrlHandler(ctx, next) {
    const { body } = ctx.request;
    const error = isValidCreateShortURLRequestBody(body);
    if (error) {
        ctx.status = error.status;
        ctx.body = {
            message: error.message
        };
        return;
    }
    ctx.status = 201;
    ctx.body = {
        shortcode: body.shortcode
    };
}


module.exports = {
    createShortUrlHandler
};