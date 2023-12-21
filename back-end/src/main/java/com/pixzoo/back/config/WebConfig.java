package com.pixzoo.back.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//import com.pixzoo.back.interceptor.UniqueEmailInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

   // private final UniqueEmailInterceptor uniqueEmailInterceptor;

    @Autowired
    public WebConfig( ) {
        //this.uniqueEmailInterceptor = uniqueEmailInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        
    }
}
