import { useEffect, useRef } from "react";

export function GeometricShape() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseDampRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const startTimeRef = useRef(Date.now());
  const SHAPE = 7;

  const vertexSource = `
attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 1.0);
  v_texcoord = a_uv;
}
`;

  const fragmentSource = `
precision highp float;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;
uniform int u_shape;
#define TWO_PI 6.28318530718
mat3 rX(float a){float s=sin(a),c=cos(a);return mat3(1.,0.,0.,0.,c,-s,0.,s,c);} 
mat3 rY(float a){float s=sin(a),c=cos(a);return mat3(c,0.,s,0.,1.,0.,-s,0.,c);} 
mat3 rZ(float a){float s=sin(a),c=cos(a);return mat3(c,-s,0.,s,c,0.,0.,0.,1.);} 
vec2 coord(vec2 p){p=p/u_resolution.xy; if(u_resolution.x>u_resolution.y){p.x*=u_resolution.x/u_resolution.y; p.x+=(u_resolution.y-u_resolution.x)/u_resolution.y/2.;} else {p.y*=u_resolution.y/u_resolution.x; p.y+=(u_resolution.x-u_resolution.y)/u_resolution.x/2.;} p-=.5; return p;}
vec2 project(vec3 p){float k=2./(2.-p.z);return p.xy*k;}
float dSeg(vec2 p, vec2 a, vec2 b){vec2 pa=p-a, ba=b-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); return length(pa-ba*h);} 
float line(vec2 p, vec2 a, vec2 b, float t, float blur){float d=dSeg(p,a,b); return smoothstep(t+blur, t-blur, d);} 
void cube(out vec3 v[8]){float s=.7; v[0]=vec3(-s,-s,-s);v[1]=vec3(s,-s,-s);v[2]=vec3(s,s,-s);v[3]=vec3(-s,s,-s);v[4]=vec3(-s,-s,s);v[5]=vec3(s,-s,s);v[6]=vec3(s,s,s);v[7]=vec3(-s,s,s);} 
float draw(vec2 p,int shape,mat3 R,float sc,float th,float bl){float res=0.; if(shape==0){vec3 v[8]; cube(v); for(int i=0;i<8;i++){v[i]=R*(v[i]*sc);} res+=line(p,project(v[0]),project(v[1]),th,bl); res+=line(p,project(v[1]),project(v[2]),th,bl); res+=line(p,project(v[2]),project(v[3]),th,bl); res+=line(p,project(v[3]),project(v[0]),th,bl); res+=line(p,project(v[4]),project(v[5]),th,bl); res+=line(p,project(v[5]),project(v[6]),th,bl); res+=line(p,project(v[6]),project(v[7]),th,bl); res+=line(p,project(v[7]),project(v[4]),th,bl); res+=line(p,project(v[0]),project(v[4]),th,bl); res+=line(p,project(v[1]),project(v[5]),th,bl); res+=line(p,project(v[2]),project(v[6]),th,bl); res+=line(p,project(v[3]),project(v[7]),th,bl); } else { vec3 v[8]; cube(v); float t=u_time*.5; float m=sin(t)*.5+.5; for(int i=0;i<8;i++){ v[i]=R*(v[i]*sc*(i<6?mix(1.,1.5,m):mix(1.,.7,m))); } float a=1.-m*.5; res+=line(p,project(v[0]),project(v[1]),th,bl)*a; res+=line(p,project(v[1]),project(v[2]),th,bl)*a; res+=line(p,project(v[2]),project(v[3]),th,bl)*a; res+=line(p,project(v[3]),project(v[0]),th,bl)*a; res+=line(p,project(v[4]),project(v[5]),th,bl)*a; res+=line(p,project(v[5]),project(v[6]),th,bl)*a; res+=line(p,project(v[6]),project(v[7]),th,bl)*a; res+=line(p,project(v[7]),project(v[4]),th,bl)*a; res+=line(p,project(v[0]),project(v[6]),th,bl)*m; res+=line(p,project(v[1]),project(v[7]),th,bl)*m; res+=line(p,project(v[2]),project(v[4]),th,bl)*m; res+=line(p,project(v[3]),project(v[5]),th,bl)*m; }
 return clamp(res,0.,1.);
}
vec3 render(vec2 st, vec2 mouse){ float md=length(st-mouse); float mi=1.-smoothstep(0.,.5,md); float time=u_time*.2; mat3 R=rY(time+(mouse.x-.5)*mi)*rX(time*.7+(mouse.y-.5)*mi)*rZ(time*.1); float sc=.35; float bl=mix(.0001,.05,mi); float th=mix(.002,.003,mi); float s=draw(st,u_shape,R,sc,th,bl); vec3 col=vec3(.9,.95,1.); float dim=1.-mi*.3; col*=s*dim; float vig=1.-length(st)*.2; col*=vig; col=pow(col,vec3(.9)); return col; }
void main(){
  vec2 st = coord(gl_FragCoord.xy);
  vec2 mouse = coord(u_mouse*u_pixelRatio) * vec2(1., -1.);
  vec3 color = render(st, mouse);
  float a = clamp(max(color.r, max(color.g, color.b)), 0.0, 1.0);
  gl_FragColor = vec4(color, a);
}
`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;
    glRef.current = gl;
    gl.clearColor(0, 0, 0, 0);
    const createShader = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };
    const v = createShader(gl.VERTEX_SHADER, vertexSource);
    const f = createShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!(v && f)) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, v);
    gl.attachShader(program, f);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    programRef.current = program;
    // biome-ignore lint/correctness/useHookAtTopLevel: false positive
    gl.useProgram(program);
    uniformsRef.current = {
      u_mouse: gl.getUniformLocation(program, "u_mouse"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_pixelRatio: gl.getUniformLocation(program, "u_pixelRatio"),
      u_time: gl.getUniformLocation(program, "u_time"),
      u_shape: gl.getUniformLocation(program, "u_shape"),
    };
    const vertices = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
    const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(program, "a_uv");
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);
    return () => {
      gl.deleteProgram(program);
      gl.deleteShader(v);
      gl.deleteShader(f);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!(canvas && container)) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const gl = glRef.current;
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      mouseRef.current = { x: clientX - rect.left, y: clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let last = performance.now();
    const animate = (time: number) => {
      const dt = (time - last) / 1000;
      last = time;
      const canvas = canvasRef.current;
      const gl = glRef.current;
      const program = programRef.current;
      if (!(canvas && gl && program)) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      const damping = 8;
      mouseDampRef.current.x +=
        (mouseRef.current.x - mouseDampRef.current.x) * damping * dt;
      mouseDampRef.current.y +=
        (mouseRef.current.y - mouseDampRef.current.y) * damping * dt;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const dpr = Math.min(window.devicePixelRatio, 2);
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      if (uniformsRef.current.u_mouse)
        gl.uniform2f(
          uniformsRef.current.u_mouse,
          mouseDampRef.current.x,
          mouseDampRef.current.y,
        );
      if (uniformsRef.current.u_resolution)
        gl.uniform2f(
          uniformsRef.current.u_resolution,
          canvas.width,
          canvas.height,
        );
      if (uniformsRef.current.u_pixelRatio)
        gl.uniform1f(uniformsRef.current.u_pixelRatio, dpr);
      if (uniformsRef.current.u_time)
        gl.uniform1f(uniformsRef.current.u_time, elapsed);
      if (uniformsRef.current.u_shape)
        gl.uniform1i(uniformsRef.current.u_shape, SHAPE);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full">
        <text className="text-black text-2xl">
          Your browser does not support the canvas element.
        </text>
      </canvas>
    </div>
  );
}
