import React, { useEffect, useRef } from 'react';
import { inputs } from './testInput';
import { drawRoundedRect, generateCoordinates, Person } from './xyCalculations';
import "../../styles/FamilyTreeCanvas.css"


const people = generateCoordinates(inputs, '4', 400); // '1' is the rootId

const TreeCanvas: React.FC = () => {



  // Refs to access the canvas and info div DOM elements
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  // Refs for canvas pan and zoom behavior
  const offsetX = useRef(0); // horizontal pan offset
  const offsetY = useRef(0); // vertical pan offset
  const scale = useRef(1.5);   // current zoom level
  // Size of each person's rectangle
  const rectW = 200;
  const rectH = 150;

  // Place (0, 0) in the middle
  const hasInitialized = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {

      const prevCenterX = (window.innerWidth / 2 - offsetX.current) / scale.current;
      const prevCenterY = (window.innerHeight / 2 - offsetY.current) / scale.current;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (!hasInitialized.current) {
        // Initial mount — center (0, 0)
        offsetX.current = canvas.width / 2 - rectW / 2;
        offsetY.current = canvas.height / 2 - rectH / 2;
        hasInitialized.current = true;
      } else {
        // On resize — preserve view
        offsetX.current = canvas.width / 2 - prevCenterX * scale.current;
        offsetY.current = canvas.height / 2 - prevCenterY * scale.current;
      }

      needsRedraw.current = true;
    };

    resizeCanvas(); // run on mount
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Refs for drag/pan tracking
  const isDragging = useRef(false);        // is mouse dragging?
  const wasDragging = useRef(false);       // was there a drag movement?
  const dragStartX = useRef(0);            // mouse X at drag start
  const dragStartY = useRef(0);            // mouse Y at drag start
  const needsRedraw = useRef(true);        // whether canvas needs to be redrawn


 
  // Draws the entire tree structure
  const drawShapes = () => {
    const canvas = canvasRef.current;

    

    if (!canvas || !needsRedraw.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    needsRedraw.current = false;

    // Clear and set up canvas transformation (pan & zoom)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX.current, offsetY.current);
    ctx.scale(scale.current, scale.current);

    const peopleMap = new Map<string, Person>();
    people.forEach(p => peopleMap.set(p.person.id, p)); // Map for easy lookup

    // Draw relationship lines first (under boxes)
    ctx.strokeStyle = '#174554';
    ctx.lineWidth = 6;

    people.forEach(person => {
      // Only draw spouse line once per couple
      if (person.person.spouse_id && person.person.id < person.person.spouse_id) {
        const spouse = peopleMap.get(person.person.spouse_id);
        if (!spouse) return;

        // Coordinates of each spouse's center
        const x1 = person.x + rectW / 2;
        const y1 = person.y + rectH / 2;
        const x2 = spouse.x + rectW / 2;
        const y2 = spouse.y + rectH / 2;

        // Draw line connecting spouses
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Draw lines connecting to children

        
      }
    });

    // Draw person boxes after lines
    people.forEach(person => {
      ctx.fillStyle = '#28758f'; // Box color
      // ctx.fillRect(person.x, person.y, rectW, rectH);
      drawRoundedRect(ctx, person.x, person.y, rectW, rectH, 16)

      // Person name
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px sans-serif';
      ctx.fillText(person.person.name, person.x + 8, person.y + 100);
    });

    ctx.restore(); // Reset transformations
  };

  // Handle clicking on canvas to show which person was clicked
  const handleCanvasClick = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    const infoDiv = infoRef.current;
    if (!canvas || !infoDiv) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouse coords to canvas (world) space
    const contentX = (mouseX - offsetX.current) / scale.current;
    const contentY = (mouseY - offsetY.current) / scale.current;

    // Check if a person's box was clicked
    const clickedPerson = people.find(
      p =>
        contentX >= p.x &&
        contentX <= p.x + rectW &&
        contentY >= p.y &&
        contentY <= p.y + rectH
    );

    // Show person's name or clear text
    if (clickedPerson) {
      infoDiv.textContent = `Clicked: ${clickedPerson.person.name}`;
      infoDiv.style.visibility = 'visible'
    } else {
      infoDiv.textContent = '';
      infoDiv.style.visibility = 'hidden'
    }
  };

  // Set up canvas events and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Main animation loop to draw the canvas
    const animate = () => {
      drawShapes();
      requestAnimationFrame(animate);
    };
    animate();

    // Handle mouse down: begin drag
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      wasDragging.current = false;
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
    };

    // Handle mouse move: update pan position if dragging
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - dragStartX.current;
      const dy = e.clientY - dragStartY.current;

      // Mark as drag if significant movement
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        wasDragging.current = true;
      }

      // Update offsets for panning
      offsetX.current += dx;
      offsetY.current += dy;
      needsRedraw.current = true;

      // Update drag start point
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
    };

    // Handle mouse up: finish drag or treat as click
    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging.current && !wasDragging.current) {
        handleCanvasClick(e); // only click if not dragged
      }
      isDragging.current = false;
    };

    // Handle zooming with Ctrl + scroll wheel
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;

      e.preventDefault();

      const zoomAmount = -e.deltaY * 0.001;
      const oldScale = scale.current;
      const newScale = Math.min(Math.max(0.1, oldScale * (1 + zoomAmount)), 2);

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Maintain zoom focus at cursor position
      const worldX = (mouseX - offsetX.current) / oldScale;
      const worldY = (mouseY - offsetY.current) / oldScale;

      scale.current = newScale;
      offsetX.current = mouseX - worldX * newScale;
      offsetY.current = mouseY - worldY * newScale;

      needsRedraw.current = true;
    };

    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up on component unmount
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Render canvas and info panel
  return (
    <div className='canvas-container-div'>
      <canvas
        className='tree-canvas'      
        ref={canvasRef}
        id="myCanvas"
        width={4000}
        height={2000}
        style={{ border: '1px solid black', touchAction: 'none' }}
      />
      <div className='info-div' id="info" ref={infoRef} style={{ marginTop: '10px', color: 'lightblue' }} />

          </div>
  );
};

export default TreeCanvas;


// <div style={{ position: 'fixed', top: 10, left: 10, color: 'white', backgroundColor: 'black', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', zIndex: 999 }}>
//         Canvas: {canvasSize.width} x {canvasSize.height}
//       </div>
//
