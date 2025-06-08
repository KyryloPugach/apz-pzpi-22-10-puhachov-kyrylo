using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bridges.Database;
using Bridges.Models;

namespace Bridges.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BridgesController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public BridgesController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Bridges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bridge>>> GetBridges()
        {
            return await _context.Bridges.ToListAsync();
        }

        // GET: api/Bridges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bridge>> GetBridge(int id)
        {
            var bridge = await _context.Bridges
                .Include(c => c.Sensors)
                .Include(c => c.Inspectors)
                .FirstOrDefaultAsync(c => c.BridgeId == id);

            if (bridge == null)
            {
                return NotFound();
            }

            return bridge;
        }

        // PUT: api/Bridges/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBridge(int id, Bridge bridge)
        {
            if (id != bridge.BridgeId)
            {
                return BadRequest();
            }

            _context.Entry(bridge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BridgeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bridges
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bridge>> PostBridge(Bridge bridge)
        {
            _context.Bridges.Add(bridge);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBridge", new { id = bridge.BridgeId }, bridge);
        }

        // DELETE: api/Bridges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBridge(int id)
        {
            var bridge = await _context.Bridges.FindAsync(id);
            if (bridge == null)
            {
                return NotFound();
            }

            _context.Bridges.Remove(bridge);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BridgeExists(int id)
        {
            return _context.Bridges.Any(e => e.BridgeId == id);
        }
    }
}
