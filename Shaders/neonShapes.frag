#define rot(a) mat2(cos(a), sin(a), -sin(a), cos(a))

vec3 palette(float t)
{
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.0, 0.1, 0.2);
    
    return a + b*cos( 6.28318*(c*t+d) );
}

float sdTriangle( in vec2 p, in float r )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0*r, 0.0 );
    return -length(p)*sign(p.y);
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy;
    uv -= 0.5;
    uv.x *= iResolution.x / iResolution.y;
    
    vec2 uv0 = uv;
    
    uv *= 5.;
    float per = 1.2;
    vec2 id = floor(uv/per);
    if (mod(id.y, 2.) > 0.5) 
    {
        uv.x += iTime;
    }
    else
    {
        uv.x -= iTime;
    }
    
    // domain repetition
    uv = mod(uv, per) - per * 0.5;
    
    uv *= rot(iTime);
    
    float d = 0.;

    vec3 col = palette(length(uv0) + iTime * 0.3);
    
    vec2 pos = vec2(uv.x + 0.07, uv.y + 0.1);
    float tri = sdTriangle(pos, 0.3);
    tri = smoothstep(0., 0.1, abs(tri));
    
    pos = vec2(uv.x - 0.07, uv.y - 0.1);
    float box = sdBox(pos, vec2(0.25));
    box = smoothstep(0., 0.1, abs(box));
    
    float neon = 0.18;
    d += neon/tri;
    d += neon/box;
    
    d = pow(d, 1.4);
    
    vec3 outColor = vec3(d * col);
    
    fragColor = vec4(uv, 0., 1.);
    fragColor = vec4(outColor, 1.);
}