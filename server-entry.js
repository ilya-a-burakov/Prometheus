import { _createApp } from './app';

export default async ssrContext => {
    const { app, router, store } = _createApp();
    const { url } = ssrContext;
    const cookies = ssrContext.cookies;
    router.push(url);

    await router.isReady();
    
    if (cookies.user) {  
        ssrContext.state = store.state
        var userJSON = JSON.parse(cookies.user)
        
        ssrContext.state.users.current.phone = userJSON.phone;
        ssrContext.state.users.current.accessToken = userJSON.accessToken;
        ssrContext.state.users.current.id = userJSON.id;
        ssrContext.state.users.current.status.loggedIn = true;
    }
    return app;
}
