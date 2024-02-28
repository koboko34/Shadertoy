float circle(vec2 uv, vec2 pos, float radius, float blurLen)
{
    float dist = length(uv-pos);
    
    float c = smoothstep(radius, radius - blurLen, dist);
    
    return c;
}

float band(float t, float start, float end, float blur)
{
    float step1 = smoothstep(start - blur, start + blur, t);
    float step2 = smoothstep(end + blur, end - blur, t);
    
    return step1 * step2;
}

float rectangle(vec2 uv, float startX, float endX, float startY, float endY, float blur)
{
    float bandY = band(uv.x, startX, endX, blur);
    float bandX = band(uv.y, startY, endY, blur);
    
    return bandY * bandX;
}

float smiley(vec2 uv, vec2 pos, float size)
{
    uv -= pos;
    uv /= size;
    
    float mask = 0.;
    
    mask += circle(uv, vec2(0.), 0.4, 0.01);
        
    mask -= circle(uv, vec2(-0.15, 0.2), 0.08, 0.01);
    mask -= circle(uv, vec2(0.15, 0.2), 0.08, 0.01);

    float mouth = circle(uv, vec2(0., 0.), 0.3, 0.01);
    mouth -= circle(uv, vec2(0., 0.1), 0.32, 0.01);
    
    mask -= mouth;
    
    return mask;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    uv -= 0.5;
    uv.x *= iResolution.x / iResolution.y;

    vec3 col = vec3(0.);
    float mask = 0.;
    
    mask = rectangle(uv, -0.2, 0.2, -0.4, 0.4, 0.01);
    
    col = vec3(1., 1., 0.) * mask;

    fragColor = vec4(col,1.);
}