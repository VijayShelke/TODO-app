var $todoapp = $('.todoapp')
var $displayTask = $('#displayTask');
var $deleteButton = $('<span class="delete-btn"></span>');

function insertAndUpdate(insertName) {

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			//var jsonResponseObject =JSON.parse(xmlhttp.responseText);

		}
	}
	xmlhttp.open("GET", "insertUpdateTODO?q=" + insertName, true);
	xmlhttp.send();
}


//Show $displayTask
$('.uncompleted').hover(function() {
		$displayTask.show("slowly")
	},
	//Hide $displayTask
	function() {
		$displayTask.hide("slowly");
	});

//Create new Task 
function newTasks() {
		var $new = $('<li><input type="checkbox"><input type="text" value=""><span class="delete-btn"></span></li>');
		//Add before $displayTask
		$displayTask.before( $new );
		//Focus on the created item
		console.dir(document.querySelector('#displayTask').value);
		$new.children('input[type="text"]').focus();
	}
	//When clicked or focused create a newTask()
	$displayTask.click(newTasks).focusin(newTasks);
	$displayTask.children("input:text").focus(newTasks);

//Focus in $displayTask to create a new item when Pressed Enter
$todoapp.on("keypress", "input:text", function() {
		$(this).each(function() {
			if (event.keyCode === 13 || event.keyCode === 9) {
				if ( $(this).val() === '') {
					$('.uncompleted-list').effect("shake", function(){
						$displayTask.focusin();
					});
				} else {
					$displayTask.focusin();
					//alert($(this).val());
					insertAndUpdate($(this).val());
				}
			}
		})
	})
	//Clicking .delete button remove its parent
	.on("click", ".delete-btn", function() {
		$(this).each(function () {
			$(this).parent().remove();
		})
	})
	//Toggles tasks between completedList and todoList
	.on("click", "input:checkbox", function() {
		$(this).each(function() {
			//when <checkbox> checked move to the .completed <ul> list
			if ($(this).prop('checked') === true) {
				$(this).parent().appendTo('.completed-list');
				$(this).prop('checked', true);
				//Else move to the .uncompleted <ul> list before $displayTask
			} else {
				$displayTask.before( $(this).parent() );
				$(this).prop('checked', false);
			}
		})
	})
	//Removes empty <li> on focusout
	.on("blur", "input:text", function() {
		$(this).each(function() {
			if ($(this).val() === '' || $(this).val() === 'undefined' ) {
				$(this).parent().remove();
			}
		})
	});