### Framework

This is just a simple javascript framework inspired by react, ember, and whatever else I can get my hands on.

TODO:

- Cache classes which inherit from Framework.Component instead of always allocating them (this is mainly going to be cached in Dom.createElement and Renderer.render)
- Implement props for classes along side states
- [Tag](https://www.pzuraq.com/blog/how-autotracking-works) components to figure out if they need to be rerendered (and updated in the cache)
