<p align="center"><img width=100 src="https://urbupdate.herokuapp.com/images/logo.png"></p>

## Programming language:

  - JAVA 
    - <a href="https://projects.spring.io/spring-framework/">Spring Framework </a>
    - <a href="https://projects.spring.io/spring-boot/">Spring boot</a>

  - JavaScript 
    - <a href="https://vuejs.org/">VueJs</a>
    - <a href="jQuery">jQuery</a>
    - <a href="https://openlayers.org/">Openlayers 3</a>

  - CSS 
    - <a href="https://getbootstrap.com/">Bootsrap Framework</a>

  - HTML

  - Mysql

## Server Requirements :

  - MySQL database

  - <a href="https://geoserver.org/">Geoserver 2.11.0</a>

  - JAVA > 1.8

  - MAVEN

## Installation :

  - Run `git clone https://github.com/khayreddineakremi/urbUpdate.git`
  
  - Create database named urbupdatejava
  
  - Install Geoserver 2.11.0
  
  - Navigate to the Geoserver path `C:\Program Files (x86)\GeoServer 2.11.0\webapps\geoserver\WEB-INF` and add those lines to `web.xml`:
  
    ```xml
        <filter>
            <filter-name>cross-origin</filter-name>
            <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
        </filter>
        <filter-mapping>
            <filter-name>cross-origin</filter-name>
            <url-pattern>/*</url-pattern>
        </filter-mapping>
    ```
  - And copy into `C:\Program Files (x86)\GeoServer 2.10.0\webapps\geoserver\WEB-INF\lib` folder : `jetty-servlets-9.2.13.v20150730.jar`
    Get jar needed from `http://central.maven.org/maven2/org/eclipse/jetty/jetty-servlets/`
    
  - Navigate to your application folder and run `run.bat` 
        
<<<<<<< HEAD
=======

>>>>>>> 1d15b98e65b97dc207252cda58d64e389a255a49
