<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Matchs;
use Illuminate\Http\Request;

class StandingsController extends Controller
{
    //
    public function index (){

    // Obtener todos los equipos
    $teams = Team::all();

    // Inicializar tabla
    $standings = collect();

    foreach ($teams as $team) {
            // Partidos donde el equipo fue local
            $homeMatches = Matchs::where('home_team_id', $team->id)
                ->whereNotNull('home_score')
                ->whereNotNull('away_score')
                ->get();

            // Partidos donde el equipo fue visitante
            $awayMatches = Matchs::where('away_team_id', $team->id)
                ->whereNotNull('home_score')
                ->whereNotNull('away_score')
                ->get();

            $played = $homeMatches->count() + $awayMatches->count();
            $goalsFor = $homeMatches->sum('home_score') + $awayMatches->sum('away_score');
            $goalsAgainst = $homeMatches->sum('away_score') + $awayMatches->sum('home_score');
            $goalDiff = $goalsFor - $goalsAgainst;

            $points = 0;

            // Calcular puntos en casa
            foreach ($homeMatches as $match) {
                if ($match->home_score > $match->away_score) {
                    $points += 3; // victoria
                } elseif ($match->home_score == $match->away_score) {
                    $points += 1; // empate
                }
            }

            // Calcular puntos de visitante
            foreach ($awayMatches as $match) {
                if ($match->away_score > $match->home_score) {
                    $points += 3;
                } elseif ($match->away_score == $match->home_score) {
                    $points += 1;
                }
            }

            $standings->push([
                'id_team' => $team->id,
                'team' => $team->name,
                'played' => $played,
                'goals_for' => $goalsFor,
                'goals_against' => $goalsAgainst,
                'goal_diff' => $goalDiff,
                'points' => $points,
            ]);
        }

        // Ordenar por puntos y diferencia de goles
        $sorted = $standings->sortByDesc('points')
            ->sortByDesc('goal_diff')
            ->values();

        return response()->json($sorted, 200);


    }


}
