<?php
  $json = $_POST['json'];

  if (json_decode($json) != null) { /* sanity check */
    $file = fopen('life_rewrite.json','w+');
    fwrite($file, $json);
    fclose($file);
  } else {
    // handle error 
    echo '---------------- bug -----------------';
  }
?>
