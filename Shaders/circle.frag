void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    // change coordinate range to -0.5 to 0.5, making 0,0 the centre of the screen
    uv -= 0.5f;
    // adjust for aspect ratio
    uv.x *= iResolution.x / iResolution.y;
    
    float r = 0.3f;
    float d = length(uv);
    
    // distance over which to apply smoothstep
    float smoothFactor = 0.03;
    
    // apply a smooth transition at the edges over distance of smoothFactor
    float c = smoothstep(r, r - smoothFactor, d);

    fragColor = vec4(vec3(c) ,1.0);
}