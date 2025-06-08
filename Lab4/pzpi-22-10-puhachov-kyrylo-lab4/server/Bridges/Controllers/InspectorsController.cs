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
    public class InspectorsController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public InspectorsController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Inspectors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inspector>>> GetInspectors()
        {
            return await _context.Inspectors.Include(c => c.Bridge).ToListAsync();
        }

        // GET: api/Inspectors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Inspector>> GetInspector(int id)
        {
            var inspector = await _context.Inspectors.FindAsync(id);

            if (inspector == null)
            {
                return NotFound();
            }

            return inspector;
        }

        // PUT: api/Inspectors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInspector(int id, Inspector inspector)
        {
            if (id != inspector.InspectorId)
            {
                return BadRequest();
            }

            _context.Entry(inspector).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InspectorExists(id))
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

        // POST: api/Inspectors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Inspector>> PostInspector(Inspector inspector)
        {
            _context.Inspectors.Add(inspector);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInspector", new { id = inspector.InspectorId }, inspector);
        }

        // DELETE: api/Inspectors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInspector(int id)
        {
            var inspector = await _context.Inspectors.FindAsync(id);
            if (inspector == null)
            {
                return NotFound();
            }

            _context.Inspectors.Remove(inspector);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InspectorExists(int id)
        {
            return _context.Inspectors.Any(e => e.InspectorId == id);
        }
    }
}
