using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAppPlayerMgmtWithAPI.Models
{
    [Table("Player")]
    public class Player
    {
        [Key]
        public int PlayerId { get; set; }
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(50)]
        public string LastName { get; set; }
        public int JerseyNumber { get; set; }
        public string Position { get; set; }
        [Required]
        [StringLength(50)]
        public string Team { get; set; }
        public DateTime DateofJoining { get; set; }
    }
}
