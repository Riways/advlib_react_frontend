cd /d D:\Programming_scratch\SPRTR\adv_lib_react\frontend\advlib_react_frontend\
call npm run build 
call heroku container:push web -a advlib  
call heroku container:release web -a advlib  