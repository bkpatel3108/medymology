<?php
	header("Access-Control-Allow-Origin: *");
	$sqlconnection = mysqli_connect("localhost", "root", "root", "Medymology") or die(mysql_error());
	
	/*
		mysql_connect("localhost","root","root") or die("Could not connect to database");
		mysql_select_db("medymology") or die("Could not find database");
	*/
	
	
	$qterm = $_GET['term'];
	$qterm = mysqli_real_escape_string($sqlconnection, $qterm);
	$qterm = trim($qterm);
	/*
	$query = mysqli_query($sqlconnection, "SELECT Term FROM TERMS WHERE Term LIKE '%$qterm%' UNION SELECT Root as 'Term' FROM ROOTS WHERE Root LIKE '%$qterm%'")
or die("Something happened!");
	*/
	
$query = mysqli_query($sqlconnection, "SELECT ROOT_NAME as Term FROM ROOT WHERE ROOT_NAME LIKE '$qterm%' 
UNION SELECT TERM_NAME FROM TERM WHERE TERM_NAME LIKE '$qterm%' UNION SELECT TERM_NAME FROM TERM WHERE TERM_NAME LIKE 
'%$qterm%' UNION SELECT ROOT_NAME as Term From ROOT WHERE ROOT_NAME LIKE '%$qterm%'") or die("Something happened!");

	$results = array();
	
	while($rows = mysqli_fetch_array($query)){
	
		$results[] = trim(ucwords($rows['Term']));
	}
	
echo json_encode($results);
