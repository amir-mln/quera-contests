-- Section1
   SELECT MAX(salary) FROM employees;
-- Section2
    SELECT 
       team_name AS team,
	   employees.name AS employee
	   salary 
	FROM employees JOIN (
	   SELECT MAX(salary) AS max_salary, teams.id AS team_id, teams.name AS team_name FROM employees 
   	   JOIN teams ON teams.id = employees.team_id
   	   GROUP BY teams.name, teams.id
   ) AS twms ON twms.team_id = employees.team_id
   WHERE twms.max_salary = salary;
   