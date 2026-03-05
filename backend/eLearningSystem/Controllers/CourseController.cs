using eLearningSystem.Data;
using eLearningSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace eLearningSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public CourseController(ApplicationDbContext db)
        {
            _db = db;
        }

        // Create course (Admin or Teacher)
        [Authorize(Roles = "Admin,Teacher")]
        [HttpPost]
        public IActionResult Create(Course course)
        {
            course.CreatedAt = DateTime.UtcNow;
            course.CreatedBy = User.FindFirstValue(ClaimTypes.Email);
            _db.Courses.Add(course);
            _db.SaveChanges();
            return Ok(course);
        }

        // Get all courses (Public)
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_db.Courses.ToList());
        }

        // Update course (Admin or Teacher)
        [Authorize(Roles = "Admin,Teacher")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, Course updated)
        {
            var course = _db.Courses.Find(id);
            if (course == null) return NotFound();

            course.Title = updated.Title;
            course.Description = updated.Description;
            _db.SaveChanges();
            return Ok(course);
        }

        // Delete course (Admin only)
        [Authorize(Roles = "Admin,Teacher")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var course = _db.Courses.Find(id);
            if (course == null) return NotFound();

            _db.Courses.Remove(course);
            _db.SaveChanges();
            return Ok("Deleted");
        }
    }
}
