﻿using System;

namespace SrdDatabase.Models.ChristianCounts
{
    public class ChristianCount
    {
        public int Id { get; }

        public int NumberOfChristians { get; }

        public DateTime Date { get; }

        public int CongregationId { get; }

        public string Congregation { get; }

        public int ParishId { get; }

        public string Parish { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }

        public ChristianCount(
            int id,
            int numberOfChristians,
            DateTime date,
            int congregationId,
            string congregation,
            int parishId,
            string parish,
            int archdeaconryId,
            string archdeaconry)
        {
            Id = id;
            NumberOfChristians = numberOfChristians;
            Date = date;
            CongregationId = congregationId;
            Congregation = congregation;
            ParishId = parishId;
            Parish = parish;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
        }

        // for Dapper
        public ChristianCount()
        {
        }
    }
}
