function addSemester() {
    const semestersDiv = document.getElementById('semesters');
    
    const semesterDiv = document.createElement('div');
    semesterDiv.classList.add('semester');
    
    semesterDiv.innerHTML = `
        <h3>Semester</h3>
        <label>Credits (comma separated): </label>
        <input type="text" name="credits" placeholder="e.g., 4,3,3" required><br>
        <label>Grades (comma separated): </label>
        <input type="text" name="grades" placeholder="e.g., 8.5,9.0,7.5" required><br>
    `;
    
    semestersDiv.appendChild(semesterDiv);
}

function calculateCGPA() {
    const form = document.getElementById('cgpaForm');
    const semesters = Array.from(form.querySelectorAll('.semester')).map(semesterDiv => {
        const credits = semesterDiv.querySelector('input[name="credits"]').value.split(',').map(Number);
        const grades = semesterDiv.querySelector('input[name="grades"]').value.split(',').map(Number);
        
        return { credits, grades };
    });
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    semesters.forEach(semester => {
        const { credits, grades } = semester;
        const semesterPoints = grades.reduce((sum, grade, index) => sum + (grade * credits[index]), 0);
        totalCredits += credits.reduce((sum, credit) => sum + credit, 0);
        totalPoints += semesterPoints;
    });
    
    const cgpa = totalCredits === 0 ? 0 : totalPoints / totalCredits;
    document.getElementById('result').textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
}

document.getElementById('cgpaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateCGPA();
});
