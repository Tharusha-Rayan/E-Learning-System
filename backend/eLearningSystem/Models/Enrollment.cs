using System.ComponentModel.DataAnnotations;

namespace eLearningSystem.Models
{
    public class Enrollment
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int CourseId { get; set; }

        public Course Course { get; set; } = null!;
    }
}
