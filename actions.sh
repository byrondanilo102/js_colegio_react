#!/bin/bash

opcion=0
linea=""

get_menu_opciones() {
    clear
    echo
    echo -e "\t\t---------- DEV ACTIONS ----------\n"
    
	echo -e "\t1. Build Project (npm run build)"
    echo -e "\t2. Dev Project (npm run build)"
    echo -e "\t3. Start Project (npm run start)"
    echo -e "\t4. Preview Project (npm run preview)"
    
    echo -e "\n\t---------- OPEN APPPs ----------\n"
    echo -e "\t11. Open VS-Code IDE (code .)"
    echo -e "\t12. Open Sublime-Text IDE (sublime_text .)"

    echo -e "\n\t0. Salir\n\n"
    
    read -p "Escoja una Opcion: " opcion
}

exec_build() {
	clear	
    echo -e "----------- 1. Build Project (npm run build) -------------"
    echo
    
    npm run build
}  

exec_dev() {
    clear   
    echo -e "----------- 2. Dev Project (npm run dev) -------------"
    echo
    
    npm run dev
}

exec_start() {
	clear	
    echo -e "----------- 3. Start Project (npm run start) -------------"
    echo
    
    npm run start
}

exec_start_preview() {
    clear   
    echo -e "----------- 4. Preview Project (npm run preview) -------------"
    echo
    
    npm run preview
}

open_vscode() {
    clear   
    echo -e "----------- 11. Open VS-Code IDE (code .) -------------"
    echo
    
    code .
}

open_sublime_text() {
    clear   
    echo -e "----------- 12. Open Sublime-Text IDE (sublime_text .) -------------"
    echo
    
    /opt/sublime_text/sublime_text .
}


while [ 1 ]
do

    get_menu_opciones

    case $opcion in
    
        0)
            clear;
            echo -e "Proceso terminado correctamente..."
            break ;;
            
        1)  exec_build ;;      
        2)  exec_dev ;;      
        3)  exec_start ;;          
        4)  exec_start_preview ;;

        11)  open_vscode ;;            
        12)  open_sublime_text ;; 
        
        *)  echo -e "Seleccion Incorrecta" ;;

    esac

echo -e "Presione la tecla Enter para continuar"
read linea

done