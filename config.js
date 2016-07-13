'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN || 'EUNZK4RPON5MAIS46XELIJZWDSNFPFFG'
if (!WIT_TOKEN) {
  throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAQiCtAhW0wBAI8JokjEXwNkwujuaxfzVdhRYkRlzzTJgMdiN9XvrVtVcyiUdrw9Su9WJ0ly6M6ZBGFbNjZBqYOyHoHvtIZBvxCHBhnZAdTEzfUXtDt6kjZCqlZBa32VaLXjgFlip7t3b41NdvhTi8RicQAzCYRbT5pg7NJAkjZAAZDZD';
if (!FB_PAGE_TOKEN) {
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'hello_world'

module.exports = {
    FB_PAGE_TOKEN: FB_PAGE_TOKEN,
    FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
    WIT_TOKEN: WIT_TOKEN,
};
