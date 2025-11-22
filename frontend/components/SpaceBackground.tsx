import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class for stars and shooting stars
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.color = this.getStarColor();
      }

      getStarColor() {
        const colors = [
          '#ffffff',
          '#ffd700',
          '#87ceeb',
          '#ff69b4',
          '#00ffff',
          '#ff6347',
          '#9370db',
          '#ffa500'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.twinkleSpeed;

        if (this.opacity > 1 || this.opacity < 0) {
          this.twinkleSpeed = -this.twinkleSpeed;
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Shooting Star class
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 10 + 8;
        this.size = Math.random() * 2 + 1;
        this.opacity = 1;
        this.angle = Math.PI / 4;
        this.color = '#ffffff';
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.01;

        if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        const gradient = ctx.createLinearGradient(
          this.x, this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    // Planet class
    class Planet {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 40 + 20;
        this.color = this.getPlanetColor();
        this.orbitRadius = Math.random() * 100 + 50;
        this.orbitSpeed = (Math.random() - 0.5) * 0.001;
        this.angle = Math.random() * Math.PI * 2;
        this.centerX = this.x;
        this.centerY = this.y;
      }

      getPlanetColor() {
        const colors = [
          { primary: '#ff6b35', secondary: '#f7931e' },
          { primary: '#4ecdc4', secondary: '#44a8b3' },
          { primary: '#9b59b6', secondary: '#8e44ad' },
          { primary: '#3498db', secondary: '#2980b9' },
          { primary: '#e74c3c', secondary: '#c0392b' },
          { primary: '#f39c12', secondary: '#d68910' }
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.angle += this.orbitSpeed;
        this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
        this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;
      }

      draw() {
        ctx.save();

        // Draw planet shadow
        const shadowGradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius
        );
        shadowGradient.addColorStop(0, this.color.primary);
        shadowGradient.addColorStop(1, this.color.secondary);

        ctx.fillStyle = shadowGradient;
        ctx.shadowBlur = 30;
        ctx.shadowColor = this.color.primary;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw planet highlight
        const highlightGradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius
        );
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = highlightGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Nebula class for colorful space clouds
    class Nebula {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 200 + 100;
        this.color = this.getNebulaColor();
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
      }

      getNebulaColor() {
        const colors = [
          '#ff00ff',
          '#00ffff',
          '#ffff00',
          '#ff0080',
          '#0080ff',
          '#80ff00'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.opacity += this.pulseSpeed;
        if (this.opacity > 0.4 || this.opacity < 0.1) {
          this.pulseSpeed = -this.pulseSpeed;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const stars = Array.from({ length: 300 }, () => new Star());
    const shootingStars = Array.from({ length: 5 }, () => new ShootingStar()); // Reduced from 15 to 5
    const planets = Array.from({ length: 8 }, () => new Planet());
    const nebulas = Array.from({ length: 5 }, () => new Nebula());

    // Animation loop
    function animate() {
      // Create space gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#0a0a2e');
      gradient.addColorStop(1, '#1a0a2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update nebulas
      nebulas.forEach(nebula => {
        nebula.update();
        nebula.draw();
      });

      // Draw and update planets
      planets.forEach(planet => {
        planet.update();
        planet.draw();
      });

      // Draw and update stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Draw and update shooting stars
      shootingStars.forEach(shootingStar => {
        shootingStar.update();
        shootingStar.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(to bottom, #000000, #0a0a2e, #1a0a2e)' }}
    />
  );
}