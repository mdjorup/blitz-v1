import React from 'react'
import * as NFLIcons from 'react-nfl-logos';

function NFLIcon({team, size}) {
  return (
    <div>
      {team === "ARI" && <NFLIcons.ARI size={size}/>}
      {team === "ATL" && <NFLIcons.ATL size={size}/>}
      {team === "BAL" && <NFLIcons.BAL size={size}/>}
      {team === "BUF" && <NFLIcons.BUF size={size}/>}
      {team === "CAR" && <NFLIcons.CAR size={size}/>}
      {team === "CHI" && <NFLIcons.CHI size={size}/>}
      {team === "CIN" && <NFLIcons.CIN size={size}/>}
      {team === "CLE" && <NFLIcons.CLE size={size}/>}
      {team === "DAL" && <NFLIcons.DAL size={size}/>}
      {team === "DEN" && <NFLIcons.DEN size={size}/>}
      {team === "DET" && <NFLIcons.DET size={size}/>}
      {team === "GB" && <NFLIcons.GB size={size}/>}
      {team === "HOU" && <NFLIcons.HOU size={size}/>}
      {team === "IND" && <NFLIcons.IND size={size}/>}
      {team === "JAX" && <NFLIcons.JAX size={size}/>}
      {team === "KC" && <NFLIcons.KC size={size}/>}
      {team === "LAC" && <NFLIcons.LAC size={size}/>}
      {team === "LAR" && <NFLIcons.LAR size={size}/>}
      {team === "LV" && <NFLIcons.LV size={size}/>}
      {team === "MIA" && <NFLIcons.MIA size={size}/>}
      {team === "MIN" && <NFLIcons.MIN size={size}/>}
      {team === "NE" && <NFLIcons.NE size={size}/>}
      {team === "NO" && <NFLIcons.NO size={size}/>}
      {team === "NYG" && <NFLIcons.NYG size={size}/>}
      {team === "NYJ" && <NFLIcons.NYJ size={size}/>}
      {team === "PHI" && <NFLIcons.PHI size={size}/>}
      {team === "PIT" && <NFLIcons.PIT size={size}/>}
      {team === "SEA" && <NFLIcons.SEA size={size}/>}
      {team === "SF" && <NFLIcons.SF size={size}/>}
      {team === "TB" && <NFLIcons.TB size={size}/>}
      {team === "TEN" && <NFLIcons.TEN size={size}/>}
      {team === "WAS" && <NFLIcons.WAS size={size}/>}
    </div>
  )
}

export default NFLIcon