<?php 
    $valores = array(); 
    $titulo = 'Aniversario LXIII de Creacion de Asociacion Nacional de Suboficiales y Sargentops de las Fuerzas Armadas';
    $contenido = 'Ceremonia de conmemoracion al LXIII de Creacion de Asociacion Nacional de Suboficiales y Sargentops de las Fuerzas Armadas, realizado el pasado viernes 4 de octubre';
    $fotos = array (array('image' => 'https://ascinalss.herokuapp.com/social/ani01.jpg'),
                    array('image' => 'https://ascinalss.herokuapp.com/social/ani02.jpg'),
                    array('image' => 'https://ascinalss.herokuapp.com/social/ani03.jpg'),
                    array('image' => 'https://ascinalss.herokuapp.com/social/ani04.jpg'),
                    array('image' => 'https://ascinalss.herokuapp.com/social/ani05.jpg'),
    ); 
    $valores = array('titulo'=>$titulo, 'contenido'=>$contenido, 'fotos'=>$fotos); 
    echo json_encode($valores); 
?>