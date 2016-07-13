'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN
if (!WIT_TOKEN) {
  throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAQiCtAhW0wBALjklzYRwUa8n2dyBfcZBCZApZBoI0WZBDTznBMsTJ8eXltZBrNh8PXZA8Q57CL2dDEc1z9qJmMGv5sSO80fQoTpmPCZCNescA8ifhEvaXYA9FZCo66YAPZChFUYWGGpuvFdZAjzHsGefkIs69bxIkCxclYiZAgsAyw8QZDZD'
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'hello_world'

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
}