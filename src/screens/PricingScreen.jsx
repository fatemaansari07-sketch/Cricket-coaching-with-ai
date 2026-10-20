import React from "react";
import { Check, Crown } from "lucide-react";
import { C, GlassCard, SolidButton } from "../components/ui";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

const PLANS = [
  { id:"free", name:"Free", price:"₹0", sub:"Local MediaPipe", bullets:["5 local analyses/day","7 batting shots","30-day recommendation","Basic Compare","Daily Challenge"] },
  { id:"pro_99", name:"Pro", price:"₹99", sub:"100 visual credits", bullets:["Everything in Free","3 key frames: stance/impact/follow-through","Skeleton + angles + AI corrections","100 visual credits","30-day program + weekly tests","Advanced Compare"] },
  { id:"video_499", name:"Video Visualization", price:"₹499", sub:"100 video credits", bullets:["Everything in Pro","Annotated coaching video","Trajectory + bounce + skeleton","AI detects multiple deliveries","Video Compare","100 video credits"] },
  { id:"special_coach", name:"Special Coaching", price:"₹999", sub:"Personal AI Coach", bullets:["Everything in Video","Adaptive coaching roadmap","Coach Chat using history","Skill-stage progression","Human coach assignment support"] },
];

export default function PricingScreen({ planTier, refreshProfile }) {
  const { user } = useAuth();
  const activateDemo = async (tier) => {
    if (!user) return;
    const visual = ["pro_99","video_499","special_coach"].includes(tier) ? 100 : 0;
    const video = ["video_499","special_coach"].includes(tier) ? 100 : 0;
    await supabase.from("profiles").update({ plan_tier:tier, visual_credits_remaining:visual, video_credits_remaining:video, visual_credits_reset_at:new Date().toISOString().slice(0,10), video_credits_reset_at:new Date().toISOString().slice(0,10) }).eq("id",user.id);
    await refreshProfile?.();
  };
  return <div className="space-y-4">
    <div><h2 className="text-2xl font-extrabold" style={{color:C.text}}>Plans</h2><p className="text-xs mt-1" style={{color:C.muted}}>Launch pricing architecture. Payment gateway ko production me connect kiya ja sakta hai.</p></div>
    {PLANS.map(p=><GlassCard key={p.id} className="p-4" style={{borderColor:planTier===p.id?`${C.green}77`:C.border}}>
      <div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2"><div className="text-base font-extrabold" style={{color:C.text}}>{p.name}</div>{planTier===p.id&&<span className="text-[9px] font-bold px-2 py-1 rounded-full" style={{background:C.green,color:'#06110B'}}>CURRENT</span>}</div><div className="text-xs mt-1" style={{color:C.muted}}>{p.sub}</div></div><div className="text-xl font-black" style={{color:C.gold}}>{p.price}</div></div>
      <div className="space-y-2 mt-4">{p.bullets.map(b=><div key={b} className="flex gap-2 text-xs" style={{color:C.text}}><Check size={14} style={{color:C.green}} className="shrink-0"/>{b}</div>)}</div>
      {p.id!=="free" && <SolidButton className="mt-4" tone={planTier===p.id?"dark":"green"} onClick={()=>activateDemo(p.id)}><Crown size={15}/>{planTier===p.id?"Active":"Activate for testing"}</SolidButton>}
    </GlassCard>)}
  </div>;
}
