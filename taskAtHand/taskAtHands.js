"use strict";

//$(handler);
function TaskAtHandApp() {
	var version = "v1.0";
	var version = "v1.3",
		appStorage = new AppStorage("taskAtHand");
	//...

	function setStatus (message) {
		$("#app>footer").text(message);
	}

	this.start = function() {
			$("#new-task-name").keypress(function(e) {
				if (e.which == 13)  //Enter key 
				{
					addTask();
					return false;
				}
			})
			.focus();
			loadTheme();
			
			function addTask() {
				var taskName = $("#new-task-name").val();
				if (taskName) {
					addTaskElement(taskName);
					//Reset the text field
					$("#new-task-name").val("").focus();
				}
			}

			function addTaskElement(taskName) {
				var $task = $("<li></li>");
				var $delete = $("<button class='delete'>X</button>");
				var $moveUp = $("<button class='move-up'>^</button>");
				var $moveDown = $("<button class='move-down'>v</button>");
				$task.text(taskName);
				
				$task.append($delete)
				.append($moveUp)
				.append($moveDown)
				.append("<span class='task-name>" + taskName + "</span>");
				$("#task-list").append($task);

				$delete.click(function() { $task.remove(); });
				$moveUp.click(function() {
					$task.insertBefore($task.prev());
				});
				$moveDown.click(function() {
					$task.insertAfter($task.next());
				});
			}

			/*function addTaskElement(taskName){
				var $task = $("#task-template .task").clone();
				$("span.task-name", $task).text(taskName);
				$("#task-list").append($task);

				/*$("button.delete", $task).click(function() {
					$task.remove();
				});
				$("button.move-up", $task).click(function() {
					$task.insertBefore($task.prev());
				});
				$("button.move-down", $task).click(function() {
					$task.insertAfter($task.net());
				});
			}

			function addTaskElement(taskName){
				var $task = $("#task-template .task").clone();
				$("span.task-name", $task).text(taskName);
				$("#task-list").append($task);*/

				$("button.delete", $task).click(function() {
					removeTask($task);
				});
				$("button.move-up", $task).click(function() {
					moveTask($task, true);
				});
				$("button.move-down", $task).click(function() {
					moveTask($task, false);
				});

				$("span.task-name", $task).click(function() {
					onEditTaskName($(this));
				});
				$task.click(function() { onSelectTask($task); });
			}*/
			function onEditTaskName($span) {
					$span.hide()
					.siblings("input.task-name")
					.val($span.text())
					.show()
					.focus();
			}
				$("input.task-name", $task).change(function(){
					onChangeTaskName($(this));
				});
			function onChangeTaskName($input){
					$input.hide();
					var $span = $input.siblings("span.task-name");
					if ($input.val()) {
						$span.text($input.val());
					}
					$span.show();
			}
				$("input.task-name", $task).change(function() {
					onChangeTaskName($(this));
				})
				.blur(function() {
					$(this).hide().siblings("span.task-name").show();
				});		

			function saveTaskList() {
				var tasks = [];
				$("#task-list .task span.task-name").each(function() {
					tasks.push($(this).text())
				});
				appStorage.setValue("taskList", tasks);
			}
			function removeTask($task) {
				$task.remove();
				saveTaskList();
			}
			function moveTask($task, moveUp) {
				if (moveUp) {
					$task.insertBefore($task.prev());
				}
				else {
					$task.insertAfter($task.next());
				}
				saveTaskList();
			}
			function loadTaskList() {
				var tasks = appStorage.getObject("taskList");
				if(tasks) {
					for (var i in tasks) {
						addTaskElement(tasks[i]);
					}
				}
			}
		
			function onSelectTask($task) {
				if($task) {
					//Unselect other tasks
					$task.siblings(".selected").removeClass("selected");
					//Select this task
					$task.addClass("selected");
				}
			}
			$("#theme").change(onChangeTheme);
			function onChangeTheme() {
				var theme = $("#theme>option").filter(":selected").val();
				setTheme(theme);
				appStorage.setValue("theme", theme);
			}
			function setTheme(theme) {
				$("#theme-style").attr("href", "themes/" + theme + ".css");
			}
			function loadTheme() {
				var theme = appStorage.getValue("theme");
				if (theme) {
					setTheme(theme);
					$("#theme>option[value=" + theme + "]")
						.attr("selected","selected");
				}
			}

			$("#app>header").append(version);
			loadTaskList();
			setStatus("ready");
	};
}

$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});