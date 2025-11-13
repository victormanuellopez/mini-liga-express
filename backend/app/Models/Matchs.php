<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matchs extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'matchs';

    // Campos que pueden ser asignados
    protected $fillable = [
        'home_team_id',
        'away_team_id',
        'home_score',
        'away_score',
        'played_at',
    ];
}
