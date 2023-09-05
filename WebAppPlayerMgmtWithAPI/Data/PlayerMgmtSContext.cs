using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAppPlayerMgmtWithAPI.Models;

namespace WebAppPlayerMgmtWithAPI.Data
{
    public class PlayerMgmtSContext : DbContext
    {
        public PlayerMgmtSContext (DbContextOptions<PlayerMgmtSContext> options)
            : base(options)
        {
        }

        public DbSet<WebAppPlayerMgmtWithAPI.Models.Player> Player { get; set; } = default!;
    }
}
